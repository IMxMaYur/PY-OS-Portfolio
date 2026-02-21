
export type Education = {
    id: string
    degree: string
    institution: string
    location: string
    period: string
    description: string
    achievements: string[]
}

export const education: Education[] = [
    {
        id: "edu1",
        degree: "Bachelor of Engineering in Artificial Intelligence and Data Science",
        institution: "University of Mumbai",
        location: "Mumbai, IN",
        period: "2022 - 2026",
        description:
            "Specialized in Artificial Intelligence and Machine Learning with a focus on Natural Language Processing and Computer Vision.",
        achievements: [
            "Graduate with will (CGPA: 7/10)",
            /* "Research Assistant in the AI Lab",
            "Published paper on 'Efficient Transformer Models for NLP'",
            "Teaching Assistant for Machine Learning course",*/
        ],
    },
    /* {
      id: "edu2",
      degree: "Bachelor of Technology in Computer Science",
      institution: "Indian Institute of Technology",
      location: "Mumbai, India",
      period: "2014 - 2018",
      description:
        "Comprehensive education in computer science fundamentals, algorithms, data structures, and software engineering.",
      achievements: [
        "Graduated with First Class Honors (GPA: 3.8/4.0)",
        "Led the college programming team to national finals",
        "Developed an award-winning project on 'Smart Campus Solutions'",
        "Recipient of Merit Scholarship for academic excellence",
      ],
    },*/
]
