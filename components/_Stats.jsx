"use client";

import Countup from "react-countup";
import {anosExperiencia} from '@/utils';
import {useEffect, useState} from 'react';

const Stats = () => {
    // Valores iniciais estáticos
    const initialStats = [
        {num: anosExperiencia, text: "Anos de experiência"},
        {num: 12, text: "Projetos concluídos"},
        {num: 29, text: "Tecnologias dominadas"},
        {num: 0, text: "Commits no GitHub"},
    ];

    const [stats, setStats] = useState(initialStats);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchGitHubContributions = async () => {
            try {
                console.log('[DEBUG] Iniciando busca por contribuições...');

                const response = await fetch('https://api.github.com/graphql', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${process.env.NEXT_PUBLIC_GITHUB_TOKEN}`,
                    },
                    body: JSON.stringify({
                        query: `
                            query {
                                user(login: "drigovieira") {
                                    contributionsCollection {
                                        contributionCalendar {
                                            totalContributions
                                        }
                                    }
                                }
                            }
                        `,
                    }),
                });

                console.log('[DEBUG] Status da resposta:', response.status);

                if (!response.ok) {
                    throw new Error(`Erro HTTP: ${response.status}`);
                }

                const data = await response.json();
                console.log('[DEBUG] Dados completos:', data);

                const contributions = data?.data?.user?.contributionsCollection?.contributionCalendar?.totalContributions;
                console.log('[DEBUG] Total de contribuições:', contributions);

                if (contributions) {
                    console.log('[DEBUG] Atualizando estado com:', contributions);
                    setStats(prevStats =>
                        prevStats.map(stat =>
                            stat.text === "Commits no GitHub"
                                ? {...stat, num: contributions}
                                : stat
                        )
                    );
                }
            } catch (error) {
                console.error('[ERRO] Falha ao buscar contribuições:', error);
                // Mantém o valor padrão em caso de erro
            } finally {
                setIsLoading(false);
                console.log('[DEBUG] Estado final:', stats);
            }
        };

        fetchGitHubContributions();
    }, []);

    // useEffect(() => {
    //     const fetchExactCommits = async () => {
    //         try {
    //             const username = 'drigovieira';
    //             let totalCommits = 0;
    //
    //             const reposResponse = await fetch(
    //                 `https://api.github.com/users/${username}/repos?per_page=100`,
    //                 {
    //                     headers: {
    //                         ...(process.env.NEXT_PUBLIC_GITHUB_TOKEN && {
    //                             Authorization: `token ${process.env.NEXT_PUBLIC_GITHUB_TOKEN}`
    //                         })
    //                     }
    //                 }
    //             );
    //
    //             if (!reposResponse.ok) return;
    //
    //             const repos = await reposResponse.json();
    //             const validRepos = repos.filter(repo => !repo.fork && repo.size > 0);
    //
    //             const commitCounts = await Promise.all(
    //                 validRepos.map(async repo => {
    //                     try {
    //                         const commitsResponse = await fetch(
    //                             `https://api.github.com/repos/${username}/${repo.name}/commits?author=${username}&per_page=1`,
    //                             {
    //                                 headers: {
    //                                     ...(process.env.NEXT_PUBLIC_GITHUB_TOKEN && {
    //                                         Authorization: `token ${process.env.NEXT_PUBLIC_GITHUB_TOKEN}`
    //                                     })
    //                                 }
    //                             }
    //                         );
    //
    //                         if (!commitsResponse.ok) return 0;
    //
    //                         const linkHeader = commitsResponse.headers.get('Link');
    //                         if (linkHeader) {
    //                             const lastPageMatch = linkHeader.match(/page=(\d+)>; rel="last"/);
    //                             return lastPageMatch ? parseInt(lastPageMatch[1]) : 1;
    //                         }
    //                         return 1;
    //                     } catch {
    //                         return 0;
    //                     }
    //                 })
    //             );
    //
    //             totalCommits = commitCounts.reduce((sum, count) => sum + count, 0);
    //
    //             // Atualiza os stats e força nova animação
    //             if (totalCommits !== initialStats[3].num && totalCommits > 0) {
    //                 setStats(prev => prev.map((stat, i) =>
    //                     i === 3 ? {...stat, num: totalCommits} : stat
    //                 ));
    //                 setKey(prev => prev + 1); // Altera a key para forçar reanimação
    //             }
    //
    //         } catch (error) {
    //             console.error("Erro ao buscar commits:", error);
    //         }
    //     };
    //
    //     fetchExactCommits();
    // }, []);

    return (
        <section className="pt-4 pb-12 xl:pt-0 xl:pb-0">
            <div className="container mx-auto">
                <div
                    className="flex flex-wrap gap-6 max-w-[80vw] mx-auto xl:max-w-none">
                    {stats.map((stat, index) => (
                        <div key={index}
                             className="flex-1 flex gap-4 items-center justify-center xl:justify-start">
                            {isLoading && stat.text === "Contribuições no GitHub" ? (
                                <span
                                    className="text-4xl xl:text-6xl font-extrabold">{stat.num}</span>
                            ) : (
                                <Countup
                                    key={`${index}-${stat.num}`} // Key única baseada no valor
                                    end={stat.num}
                                    duration={2.5}
                                    delay={0.2}
                                    className="text-4xl xl:text-6xl font-extrabold"
                                />
                            )}
                            <p className={`${stat.text.length < 15 ? "max-w-[100px]" : "max-w-[150px]"} leading-snug text-white/80`}>
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