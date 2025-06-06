"use client";

import Countup from "react-countup";
import {anosExperiencia} from "@/utils";
import {useEffect, useState} from "react";

const Stats = () => {
    const initialStats = [
        {num: anosExperiencia, text: "Anos de experiência"},
        {num: 12, text: "Projetos concluídos"},
        {num: 29, text: "Tecnologias dominadas"},
        {num: 0, text: "Commits totais"},
    ];

    const [stats, setStats] = useState(initialStats);

    useEffect(() => {
        const fetchAllCommitsOptimized = async () => {
            try {
                console.log("🚀 Iniciando contagem de commits otimizada...");

                let allRepos = [];
                let page = 1;
                let hasMore = true;

                // 1. Fetch ALL repositories concurrently (or in parallel pages)
                const fetchRepoPage = async (currentPage) => {
                    const reposRes = await fetch(
                        `https://api.github.com/users/drigovieira/repos?page=${currentPage}&per_page=100`,
                        {
                            headers: {
                                Authorization: `Bearer ${process.env.NEXT_PUBLIC_GITHUB_TOKEN}`,
                            },
                        }
                    );
                    if (!reposRes.ok) {
                        throw new Error(`GitHub API error: ${reposRes.status} ${reposRes.statusText}`);
                    }
                    return reposRes.json();
                };

                const repoPromises = [];
                // Assuming a reasonable max number of pages to avoid infinite loops, e.g., 10 pages for 1000 repos
                for (let i = 1; i <= 10; i++) {
                    repoPromises.push(fetchRepoPage(i));
                }

                const results = await Promise.allSettled(repoPromises);

                results.forEach((result) => {
                    if (result.status === "fulfilled" && result.value.length > 0) {
                        allRepos = [...allRepos, ...result.value];
                    } else if (result.status === "rejected") {
                        console.error("❌ Erro ao buscar página de repositórios:", result.reason);
                    }
                });

                allRepos = allRepos.filter(repo => !repo.fork); // Filter out forks early
                console.log(`📦 Total de repositórios não-forks encontrados: ${allRepos.length}`);

                // 2. Fetch commit counts for all relevant repositories in parallel
                let totalCommits = 0;
                const repoCounts = {};
                const commitFetchPromises = allRepos.map(async (repo) => {
                    try {
                        // Prioritize stats/contributors as it's more direct for individual author commits
                        const statsRes = await fetch(
                            `https://api.github.com/repos/drigovieira/${repo.name}/stats/contributors`,
                            {
                                headers: {
                                    Authorization: `Bearer ${process.env.NEXT_PUBLIC_GITHUB_TOKEN}`,
                                },
                            }
                        );

                        if (statsRes.status === 200) {
                            const data = await statsRes.json();
                            const myStats = data.find((c) => c.author?.login === "drigovieira");
                            if (myStats) {
                                repoCounts[repo.name] = myStats.total;
                                console.log(`✔ ${repo.name}: ${myStats.total} commits (API Stats)`);
                                return myStats.total;
                            }
                        }

                        // Fallback: If stats/contributors fails or doesn't have data for the author
                        const commitsRes = await fetch(
                            `https://api.github.com/repos/drigovieira/${repo.name}/commits?author=drigovieira&per_page=1`,
                            {
                                headers: {
                                    Authorization: `Bearer ${process.env.NEXT_PUBLIC_GITHUB_TOKEN}`,
                                },
                            }
                        );

                        if (commitsRes.ok) {
                            const linkHeader = commitsRes.headers.get("Link");
                            if (linkHeader) {
                                const lastPageMatch = linkHeader.match(/page=(\d+)>; rel="last"/);
                                if (lastPageMatch) {
                                    const count = parseInt(lastPageMatch[1]);
                                    repoCounts[repo.name] = count;
                                    console.log(`⚠ ${repo.name}: ${count} commits (Fallback)`);
                                    return count;
                                }
                            }
                        }
                        console.warn(`No commit count found for ${repo.name}`);
                        return 0; // No commits found or error
                    } catch (error) {
                        console.error(`❌ Erro ao buscar commits para ${repo.name}:`, error.message);
                        return 0; // On error, contribute 0 commits
                    }
                });

                // Wait for all commit fetches to complete
                const commitResults = await Promise.all(commitFetchPromises);
                totalCommits = commitResults.reduce((sum, count) => sum + count, 0);

                console.log("🔍 Resultado detalhado:", repoCounts);
                console.log(`🎉 TOTAL DE COMMITS: ${totalCommits}`);

                setStats((prev) =>
                    prev.map((stat) =>
                        stat.text === "Commits totais"
                            ? {...stat, num: totalCommits}
                            : stat
                    )
                );
            } catch (error) {
                console.error("🔥 Erro geral na otimização:", error);
            }
        };

        fetchAllCommitsOptimized();
    }, []);

    return (
        <section className="pt-4 pb-12 xl:pt-0 xl:pb-0">
            <div className="container mx-auto">
                <div
                    className="flex flex-wrap gap-6 max-w-[80vw] mx-auto xl:max-w-none">
                    {stats.map((stat, index) => (
                        <div
                            key={index}
                            className="flex-1 flex gap-4 items-center justify-center xl:justify-start"
                        >
                            <Countup
                                end={stat.num}
                                duration={5}
                                delay={1}
                                className="text-4xl xl:text-6xl font-extrabold"
                            />
                            <p
                                className={`${
                                    stat.text.length < 15 ? "max-w-[100px]" : "max-w-[150px]"
                                } leading-snug text-white/80`}
                            >
                                {stat.text}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Stats;