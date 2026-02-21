
export type Certification = {
    id: string
    title: string
    issuer: string
    issuerLogo: string
    date: string
    credentialId: string
    skills: string[]
}

export const certifications: Certification[] = [
    {
        id: "cert1",
        title: "Cloud Computing Fundamentals",
        issuer: "IBM",
        issuerLogo: "/ibm.jpg",
        date: "Mar 2025",
        credentialId: "credly.com/users/mayurgiri/badges",
        skills: ["Cloud Computing", "Cloud Applications", "Cloud Services", "Deployment Models"],
    },
    {
        id: "cert2",
        title: "Build Google Cloud Infrastructure for AWS Professionals",
        issuer: "United Latino Students Association",
        issuerLogo: "/aws.webp",
        date: "Sep 2024",
        credentialId: "11592257",
        skills: ["Google Cloud", "AWS", "Cloud Infrastructure", "Cloud Migration", "Networking"],
    },
    {
        id: "cert3",
        title: "Use Machine Learning APIs on Google Cloud",
        issuer: "United Latino Students Association",
        issuerLogo: "/gc.png",
        date: "Sep 2024",
        credentialId: "11462786",
        skills: ["Machine Learning", "Google Cloud", "API Integration", "AI Solutions"],
    },
    {
        id: "cert4",
        title: "Build a Data Warehouse with BigQuery",
        issuer: "United Latino Students Association",
        issuerLogo: "/BQ.svg",
        date: "Jul 2024",
        credentialId: "9995354",
        skills: ["BigQuery", "Data Warehousing", "SQL", "Google Cloud"],
    },
    {
        id: "cert5",
        title: "Machine Learning Pipelines with Azure ML Studio",
        issuer: "United Latino Students Association",
        issuerLogo: "/AML.jpeg",
        date: "Dec 2024",
        credentialId: "0NSX8OV7EXQB",
        skills: ["Machine Learning", "Azure ML", "Pipelines", "AI Workflow"],
    },
    {
        id: "cert6",
        title: "Google Cloud Arcade Facilitator Program",
        issuer: "Google Cloud Arcade Facilitator Program",
        issuerLogo: "/gc.png",
        date: "Mar 2025",
        credentialId: "credly.com/users/mayurgiri/badges",
        skills: ["Google Cloud", "Training Facilitation", "Cloud Skills Development"],
    },
    {
        id: "cert7",
        title: "Tata Groups - Cybersecurity Analyst Job Simulation",
        issuer: "Forage",
        issuerLogo: "/Tata_logo.svg",
        date: "Apr 2024",
        credentialId: "",
        skills: ["Cybersecurity", "Threat Analysis", "Problem Solving", "Critical Thinking"],
    },
    {
        id: "cert8",
        title: "Search Engine Optimization (SEO) with Squarespace",
        issuer: "Coursera",
        issuerLogo: "/SS.png",
        date: "Apr 2024",
        credentialId: "MRLCLKUFHUGS",
        skills: ["SEO", "Organic Search", "On-Page SEO", "Traffic Analysis", "SEM"],
    },
]
