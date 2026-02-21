
export type Skill = {
    name: string
    level: number
    description: string
    useCase: string
}

export type SkillCategory = {
    id: string
    name: string
    skills: Skill[]
}

export const skillCategories: SkillCategory[] = [
    {
        id: "ml-ai",
        name: "Machine Learning & AI",
        skills: [
            {
                name: "Deep Learning",
                level: 90,
                description: "Neural Networks & Architectures",
                useCase: "Designed CNNs (ResNet) and RNNs (LSTM) for complex pattern recognition tasks",
            },
            {
                name: "TensorFlow / Keras",
                level: 85,
                description: "ML Frameworks",
                useCase: "Built end-to-end model pipelines from data preprocessing to deployment",
            },
            {
                name: "PyTorch",
                level: 80,
                description: "Research & Development",
                useCase: "Implemented custom loss functions and dynamic computation graphs for research",
            },
            {
                name: "NLP",
                level: 85,
                description: "Natural Language Processing",
                useCase: "Fine-tuned Transformer models (BERT, GPT) for sentiment analysis and text generation",
            },
            {
                name: "Computer Vision",
                level: 75,
                description: "Image Analysis",
                useCase: "Developed object detection systems using YOLO and facial recognition with Dlib",
            },
        ],
    },
    {
        id: "data-engineering",
        name: "Data Engineering",
        skills: [
            {
                name: "Python (Pandas/NumPy)",
                level: 95,
                description: "Data Manipulation",
                useCase: "Processed large datasets (>10GB) for feature engineering and statistical analysis",
            },
            {
                name: "SQL & NoSQL",
                level: 85,
                description: "Database Management",
                useCase: "Optimized complex queries in PostgreSQL and modeled unstructured data in MongoDB",
            },
            {
                name: "Data Visualization",
                level: 80,
                description: "Insights & Reporting",
                useCase: "Created interactive dashboards using Matplotlib, Seaborn, and Recharts",
            },
            {
                name: "ETL Pipelines",
                level: 70,
                description: "Data Processing",
                useCase: "Automated data ingestion and cleaning workflows for model training",
            },
        ],
    },
    {
        id: "mlops",
        name: "MLOps & Cloud",
        skills: [
            {
                name: "Docker",
                level: 80,
                description: "Containerization",
                useCase: "Containerized ML models for consistent deployment across environments",
            },
            {
                name: "AWS",
                level: 75,
                description: "Cloud Infrastructure",
                useCase: "Deployed models on EC2 and used S3 for dataset storage",
            },
            {
                name: "Git & CI/CD",
                level: 85,
                description: "Version Control",
                useCase: "Managed codebases and automated testing/deployment pipelines",
            },
            {
                name: "API Development",
                level: 90,
                description: "Model Serving",
                useCase: "Built RESTful APIs with Flask and FastAPI to serve model predictions",
            },
        ],
    },
    {
        id: "fullstack",
        name: "Full Stack Dev",
        skills: [
            {
                name: "React & Next.js",
                level: 90,
                description: "Frontend Frameworks",
                useCase: "Built responsive web interfaces for interacting with AI models",
            },
            {
                name: "TypeScript",
                level: 85,
                description: "Type Safety",
                useCase: "Ensured robust and maintainable frontend codebases",
            },
            {
                name: "Node.js",
                level: 80,
                description: "Backend Runtime",
                useCase: "Handled real-time communications and server-side logic",
            },
        ],
    },
]
