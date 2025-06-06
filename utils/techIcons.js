// utils/techIcons.js
import { skills } from '@/data/skills';

const specialMappings = {
    'node': 'JavaScript',
    'nodejs': 'JavaScript'
};

export const getTechIcon = (techName) => {
    const normalizedTechName = techName.toLowerCase().replace(/[.-]/g, '');

    // Verifica mapeamentos especiais primeiro
    const mappedName = specialMappings[normalizedTechName] || techName;

    const skill = skills.skillList.find(item =>
        item.name.toLowerCase().replace(/[.-]/g, '') === mappedName.toLowerCase().replace(/[.-]/g, '')
    );

    return skill ? skill.icon : null;
};