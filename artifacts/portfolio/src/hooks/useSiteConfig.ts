import { useState, useEffect } from "react";

const STORAGE_KEY = "site_config_v2";

export interface ExperienceEntry {
  role: { en: string; pt: string };
  company: string;
  type: { en: string; pt: string };
  period: { en: string; pt: string };
  location: { en: string; pt: string };
  description: { en: string; pt: string };
  tags: { en: string[]; pt: string[] };
  current: boolean;
}

export interface SkillCategory {
  title_en: string;
  title_pt: string;
  skills: string[];
}

export interface SiteConfig {
  profile: {
    fullName: string;
    navName: string;
    roles_en: string[];
    roles_pt: string[];
    description_en: string;
    description_pt: string;
  };
  about: {
    subtitle_en: string;
    subtitle_pt: string;
    p1_en: string; p1_pt: string;
    p2_en: string; p2_pt: string;
    p3_en: string; p3_pt: string;
    stat_experience: string;
    stat_tickets: string;
    stat_satisfaction: string;
    stat_systems: string;
  };
  contact: {
    email: string;
    phone: string;
    linkedin: string;
    linkedinUrl: string;
    location: string;
    github: string;
    githubUrl: string;
  };
  experience: ExperienceEntry[];
  skills: SkillCategory[];
}

export const DEFAULT_CONFIG: SiteConfig = {
  profile: {
    fullName: "João Gaspar",
    navName: "João",
    roles_en: ["Helpdesk Technician", "Junior Sysadmin", "Network Technician"],
    roles_pt: ["Helpdesk Técnico", "Sysadmin Júnior", "Técnico de Redes"],
    description_en: "Technical solutions with dedication and professionalism. Focused on keeping infrastructures secure, efficient, and users productive.",
    description_pt: "Soluções técnicas com dedicação e profissionalismo. Focado em manter infraestruturas seguras, eficientes e utilizadores produtivos.",
  },
  about: {
    subtitle_en: "The bridge between technology and users.",
    subtitle_pt: "A ponte entre a tecnologia e os utilizadores.",
    p1_en: "I am an IT professional based in Portugal with a passion for solving complex problems and optimising infrastructures. My journey started in Helpdesk, where I developed strong empathy for users and their everyday technology needs.",
    p1_pt: "Sou um profissional de IT em Portugal com uma paixão por resolver problemas complexos e otimizar infraestruturas. A minha jornada começou no Helpdesk, onde desenvolvi uma forte empatia pelos utilizadores e pelas suas necessidades tecnológicas diárias.",
    p2_en: "I currently work as a Junior Sysadmin and Network Technician, designing, implementing and maintaining secure networks and robust server systems. I believe technology should be a silent enabler, not an obstacle.",
    p2_pt: "Atualmente, atuo como Sysadmin Júnior e Técnico de Redes, desenhando, implementando e mantendo redes seguras e sistemas de servidores robustos. Acredito que a tecnologia deve ser um facilitador silencioso, não um obstáculo.",
    p3_en: "I am constantly exploring new automation tools (especially PowerShell) and monitoring methodologies to anticipate incidents before they affect operations.",
    p3_pt: "Estou constantemente a explorar novas ferramentas de automação (especialmente PowerShell) e metodologias de monitorização para antecipar incidentes antes que eles afetem a operação.",
    stat_experience: "3+",
    stat_tickets: "500+",
    stat_satisfaction: "99%",
    stat_systems: "10+",
  },
  contact: {
    email: "support@joaocgaspar.ovh",
    phone: "+351 968 196 979",
    linkedin: "linkedin.com/in/joacgaspar",
    linkedinUrl: "https://www.linkedin.com/in/joacgaspar/",
    location: "Castelo Branco, Portugal",
    github: "github.com/JoaoGaspar04",
    githubUrl: "https://github.com/JoaoGaspar04",
  },
  experience: [
    {
      role: { en: "IT & Network Management Technician", pt: "Técnico de Informática e Gestão de Redes" },
      company: "Torre Confecções",
      type: { en: "Level 5 Curricular Internship", pt: "Estágio Curricular Nível 5" },
      period: { en: "Feb 2025 – Jun 2025 · 5 months", pt: "fev 2025 – jun 2025 · 5 meses" },
      location: { en: "Comeal da Torre · On-site", pt: "Comeal da Torre · Presencial" },
      description: {
        en: "Level 5 internship focused on cybersecurity, network management and IT infrastructure. Responsible for administering and monitoring the local network, implementing security measures and providing technical support to users.",
        pt: "Estágio curricular de nível 5 com foco em cibersegurança, gestão de redes e infraestrutura informática. Responsável pela administração e monitorização da rede local, implementação de medidas de segurança e suporte técnico aos utilizadores.",
      },
      tags: { en: ["Cybersecurity", "Network Management", "Technical Support", "IT Infrastructure"], pt: ["Cibersegurança", "Gestão de Redes", "Suporte Técnico", "Infraestrutura IT"] },
      current: true,
    },
    {
      role: { en: "IT Technician", pt: "Técnico de TI" },
      company: "SuporteDreams",
      type: { en: "Level 4 Curricular Internship", pt: "Estágio Curricular Nível 4" },
      period: { en: "Apr 2022 – Jun 2022 · 3 months", pt: "abr 2022 – jun 2022 · 3 meses" },
      location: { en: "Guarda, Portugal · On-site", pt: "Guarda, Portugal · Presencial" },
      description: {
        en: "Level 4 internship focused on computer networks and technical support. Configuration and maintenance of network equipment, diagnosis and resolution of hardware and software incidents.",
        pt: "Estágio curricular de nível 4 com foco em redes de computadores e suporte técnico. Configuração e manutenção de equipamentos de rede, diagnóstico e resolução de incidentes de hardware e software.",
      },
      tags: { en: ["Computer Networks", "Technical Support", "Hardware", "Diagnostics"], pt: ["Redes de Computadores", "Suporte Técnico", "Hardware", "Diagnóstico"] },
      current: false,
    },
    {
      role: { en: "IT Technician", pt: "Técnico de TI" },
      company: "ClickMed.pt",
      type: { en: "Level 4 Curricular Internship", pt: "Estágio Curricular Nível 4" },
      period: { en: "Aug 2020 – Nov 2020 · 4 months", pt: "ago 2020 – nov 2020 · 4 meses" },
      location: { en: "Covilhã, Castelo Branco · On-site", pt: "Covilhã, Castelo Branco · Presencial" },
      description: {
        en: "Level 4 internship in information technology. Technical support, computer systems maintenance and user assistance.",
        pt: "Estágio curricular de nível 4 na área de tecnologias de informação. Apoio técnico, manutenção de sistemas informáticos e suporte aos utilizadores.",
      },
      tags: { en: ["Technical Support", "Systems Maintenance", "Help Desk"], pt: ["Suporte Técnico", "Manutenção de Sistemas", "Help Desk"] },
      current: false,
    },
  ],
  skills: [
    { title_en: "Helpdesk & Support", title_pt: "Helpdesk & Suporte", skills: ["Windows 10/11", "Active Directory", "Office 365", "ITSM / Ticketing", "Remote Desktop", "Incident Management"] },
    { title_en: "Systems & Servers", title_pt: "Sistemas & Servidores", skills: ["Windows Server 2019/2022", "Linux (Ubuntu/CentOS)", "VMware/Hyper-V", "Backup & Recovery", "DNS/DHCP", "PowerShell"] },
    { title_en: "Networking", title_pt: "Redes", skills: ["TCP/IP", "VLANs", "Cisco (CCNA level)", "Firewalls (pfSense)", "Monitoring", "VPN"] },
    { title_en: "Tools", title_pt: "Ferramentas", skills: ["Zabbix", "Nagios", "Wireshark", "Git", "Microsoft SCCM", "ServiceNow"] },
  ],
};

function loadConfig(): SiteConfig {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return DEFAULT_CONFIG;
    return { ...DEFAULT_CONFIG, ...JSON.parse(raw) };
  } catch {
    return DEFAULT_CONFIG;
  }
}

export function getSiteConfig(): SiteConfig {
  return loadConfig();
}

export function useSiteConfig() {
  const [config, setConfigState] = useState<SiteConfig>(loadConfig);

  useEffect(() => {
    const onStorage = () => setConfigState(loadConfig());
    window.addEventListener("storage", onStorage);
    window.addEventListener("siteconfig-updated", onStorage);
    return () => {
      window.removeEventListener("storage", onStorage);
      window.removeEventListener("siteconfig-updated", onStorage);
    };
  }, []);

  function setConfig(updates: Partial<SiteConfig>) {
    const merged = { ...config, ...updates };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(merged));
    setConfigState(merged);
    window.dispatchEvent(new Event("siteconfig-updated"));
  }

  function resetConfig() {
    localStorage.removeItem(STORAGE_KEY);
    setConfigState(DEFAULT_CONFIG);
    window.dispatchEvent(new Event("siteconfig-updated"));
  }

  return { config, setConfig, resetConfig };
}
