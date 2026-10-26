/**
 * Public portfolio links retained from the original website.
 * Add private work only after confirming that its details are suitable to publish.
 */
export const projects = [
  {
    id: 'korean-agent',
    number: '01',
    category: 'LANGUAGE · AI',
    title: 'Korean Agent',
    description: 'A Python-based Korean language agent — an exploration of building software around language learning.',
    stack: ['Python', 'Language tools'],
    href: 'https://github.com/Jiashun-Hao/Korean-Agent',
    visual: 'agent',
    featured: true
  },
  {
    id: 'camera-tracking',
    number: '02',
    category: 'SYSTEMS · AUTOMATION',
    title: 'Camera Tracking',
    description: 'An automatic camera-tracking program that works with microphone presets.',
    stack: ['Automation', 'Device control'],
    href: 'https://github.com/Jiashun-Hao/Camera-tracking-microphone',
    visual: 'camera',
    featured: true
  },
  {
    id: 'graph-preprocessing',
    number: '03',
    category: 'RESEARCH · GRAPH DATA',
    title: 'Graph Preprocessing',
    description: 'Tools for preparing program graphs, including AST, CFG, PDG and CPG, for graph-based research.',
    stack: ['Graph data', 'Research'],
    href: 'https://github.com/Jiashun-Hao/Graph_Preprocessing',
    visual: 'graph',
    featured: true
  }
] as const

export const skillGroups = [
  { title: 'Languages', items: ['Java', 'Python', 'JavaScript'] },
  { title: 'Frontend', items: ['Vue', 'HTML', 'CSS', 'Vite'] },
  { title: 'Backend & tools', items: ['Spring Boot', 'MyBatis', 'Docker', 'Nginx'] },
  { title: 'AI & ML', items: ['PyTorch', 'TensorFlow', 'Deep Learning', 'Machine Learning'] }
] as const

export const education = [
  {
    school: 'Kyungpook National University',
    degree: 'M.Eng. · Computer Science & Engineering',
    period: '2023 — 2025',
    url: 'https://www.knu.ac.kr/'
  },
  {
    school: 'Inner Mongolia Agricultural University',
    degree: 'B.Eng. · Computer Science & Technology',
    period: '2018 — 2022',
    url: 'https://www.imau.edu.cn/'
  }
] as const

export const publications = [
  {
    title: 'Enhancing Graph-Based Vulnerability Detection through Standardized Deep Learning Pipelines',
    venue: 'IEEE TrustCom',
    year: '2024',
    href: 'https://ieeexplore.ieee.org/document/10944886'
  },
  {
    title: 'Unveiling Hidden Vulnerabilities: Similar Vulnerability Detection Using a Gradient Boosting Decision Tree',
    venue: 'KICS Conference',
    year: '2023',
    href: 'https://www.dbpia.co.kr/journal/articleDetail?nodeId=NODE11487615'
  }
] as const
