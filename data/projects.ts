
export type Project = {
    id: string
    title: string
    description: string
    image: string
    demoUrl: string
    modelUrl?: string
    githubUrl: string
    category: string
    tags: string[]
    featured: boolean
    keyResult?: string
    details: {
        overview: string
        goals: string[]
        challenges: string[]
        solutions: string[]
        techStack: string[]
    }
}

export const projects: Project[] = [
    {
        id: "project1",
        title: "AI-Based Insider Threat Detection",
        description:
            "Insider Threat Detection is the process of identifying and mitigating risks posed by trusted individuals within an organization who may intentionally or unintentionally harm systems, data, or operations.",
        image: "/itds.webp?height=600&width=800",
        demoUrl: "https://insider-threat-detection-system.vercel.app/",
        modelUrl: "#", // Placeholder for Colab/HuggingFace link
        githubUrl: "https://github.com/IMxMaYur/Insider-Threat-Detection",
        category: "ai",
        tags: ["React", "Node.js", "Deep Learning", "NLP", "MongoDB"],
        featured: true,
        keyResult: "94% Detection Accuracy",
        details: {
            overview:
                "AI-Based Insider Threat Detection leverages machine learning and behavioral analytics to identify anomalous activities by trusted users. The system achieved a 94% detection accuracy using an ensemble of Autoencoders and Isolation Forests.",
            goals: [
                "Anomaly Detection – Identify unusual behavior patterns with high precision (94% Accuracy).",
                "Real-Time Monitoring – Process user activity logs with <200ms latency.",
                "Threat Classification – Distinguish between benign and malicious actions.",
                "Proactive Alerting – Generate alerts to prevent data breaches.",
            ],
            challenges: [
                "Data Imbalance – Malicious events were <1% of the dataset; used SMOTE to balance.",
                "Privacy Concerns – Implemented Differential Privacy to protect user identities.",
                "Adaptive Attackers – Used Online Learning to adapt to shifting attack patterns.",
                "False Positives – Reduced false alarm rate by 15% using human-in-the-loop validation.",
            ],
            solutions: [
                "Ensemble Models – Combined Autoencoders (reconstruction error) and Isolation Forests.",
                "Privacy-Preserving – Anonymized logs before processing.",
                "Dynamic Thresholding – Adaptive anomaly scores based on user roles.",
                "Explainable AI – Used SHAP values to explain why a user was flagged.",
            ],
            techStack: [
                "Frontend: React, TypeScript, Tailwind CSS, Recharts",
                "Backend: Python (Flask), Socket.IO (Real-time alerting)",
                "AI/ML: Scikit-learn, TensorFlow, Autoencoders, Isolation Forest, SMOTE",
                "Database: MongoDB (TimeSeries data), PostgreSQL",
                "DevOps: Docker, AWS EC2",
            ],
        },
    },
    {
        id: "project5",
        title: "AI-Based Medical Diagnostics System",
        description:
            "An AI-powered healthcare system that analyzes medical images to detect diseases and provide treatment suggestions.",
        image: "/mds.webp?height=600&width=800",
        demoUrl: "https://github.com/IMxMaYur",
        githubUrl: "https://github.com/IMxMaYur",
        category: "ai",
        tags: ["TensorFlow", "Keras", "OpenCV", "Flask", "React.js"],
        featured: true,
        keyResult: "AUC: 0.89 on ChestX-ray14",
        details: {
            overview: "A deep learning system for early disease detection using medical images (X-rays/MRIs). Trained on the ChestX-ray14 dataset, achieving an AUC of 0.89.",
            goals: [
                "High Accuracy – Detect 14 common thoracic diseases with >85% sensitivity.",
                "Explainability – Use Grad-CAM to visualize affected regions.",
                "Scalable Deployment – Serve model predictions via REST API.",
                "Real-time Inference – Optimize model for sub-second diagnosis.",
            ],
            challenges: [
                "Large Datasets – Processed 100GB+ of high-resolution X-ray images.",
                "Class Imbalance – Rare diseases were underrepresented.",
                "Model Interpretability – 'Black box' nature of CNNs in healthcare.",
                "Inference Latency – Heavy ResNet50 model was initially too slow.",
            ],
            solutions: [
                "Transfer Learning – Fine-tuned ResNet50 and DenseNet121 pre-trained on ImageNet.",
                "Data Augmentation – Rotation, flipping, and contrast adjustment to tackle imbalance.",
                "Grad-CAM – Integrated heatmaps to show doctors *where* the model looked.",
                "Model Pruning – Reduced model size by 40% for faster inference.",
            ],
            techStack: [
                "AI: PyTorch, TorchVision, ResNet50, DenseNet121, Grad-CAM",
                "Frontend: React.js, Tailwind CSS",
                "Backend: FastAPI (Python) for high-performance serving",
                "Database: PostgreSQL",
            ],
        },
    },
    {
        id: "project6",
        title: "Driver Fatigue Detection System",
        description:
            "An AI-powered road safety system that detects driver drowsiness in real-time using computer vision.",
        image: "/dfds.webp?height=600&width=800",
        demoUrl: "https://github.com/IMxMaYur",
        githubUrl: "https://github.com/IMxMaYur",
        category: "ai",
        tags: ["OpenCV", "Dlib", "TensorFlow", "Python"],
        featured: false,
        details: {
            overview:
                "Monitors drivers’ alertness levels using facial landmark detection (EAR - Eye Aspect Ratio). Runs at 30 FPS on edge devices.",
            goals: [
                "Real-time Safety – Detect drowsiness within 2 seconds of onset.",
                "Low Latency – Process video frames at >25 FPS.",
                "Robustness – Work effectively in low-light and with glasses.",
                "Edge Deployment – Run efficiently on Raspberry Pi/Jetson Nano.",
            ],
            challenges: [
                "Lighting Conditions – Variations in cabin lighting affected detection.",
                "Occlusions – Glasses and face masks confused the landmark detector.",
                "Processing Power – High CPU usage caused lag on low-end hardware.",
                "False Positives – Blinking vs. sleeping distinction.",
            ],
            solutions: [
                "dlib 68-Point Landmarks – Precise facial mapping for EAR calculation.",
                "CLAHE – Contrast Limited Adaptive Histogram Equalization for low-light.",
                "Frame Skipping – Processed every 2nd frame to boost FPS.",
                "Temporal Smoothing – Averaged EAR over 5 frames to reduce noise.",
            ],
            techStack: ["Computer Vision: OpenCV, dlib, CLAHE", "AI: MobileNetV2 (lightweight model)", "Language: Python", "Hardware: Raspberry Pi Compatibility"],
        },
    },
    {
        id: "project7",
        title: "Speech Transcriber",
        description: "A Flask-based application that converts video speech into text using speech recognition.",
        image: "/st.webp?height=600&width=800",
        demoUrl: "https://video-2text.netlify.app",
        githubUrl: "https://github.com/IMxMaYur/Speech-to-text",
        category: "web",
        tags: ["Python", "Flask", "Speech Recognition", "JavaScript"],
        featured: false,
        details: {
            overview:
                "A tool to upload videos, extract audio, and generate a downloadable transcript using Google Speech Recognition.",
            goals: [
                "Provide easy video-to-text transcription",
                "Support multiple video formats",
                "Optimize for offline readiness",
                "Ensure accurate transcription",
            ],
            challenges: [
                "Handling large video file uploads",
                "Ensuring transcription accuracy",
                "Managing API limitations",
                "Processing audio efficiently",
            ],
            solutions: [
                "Used FFmpeg and MoviePy for audio extraction",
                "Integrated Google Speech Recognition API",
                "Implemented error handling for unsupported formats",
                "Limited transcription to first 60 seconds for performance",
            ],
            techStack: [
                "Backend: Flask (Python)",
                "Frontend: JavaScript, HTML/CSS",
                "Audio Processing: FFmpeg, MoviePy",
                "API: Google Speech Recognition",
            ],
        },
    },
    {
        id: "project8",
        title: "Personalized Diet Recommendation System",
        description:
            "A web application that generates personalized diet plans based on user profile and dietary preferences.",
        image: "/pdrs.webp?height=600&width=800",
        demoUrl: "https://github.com/IMxMaYur",
        githubUrl: "https://github.com/IMxMaYur",
        category: "web",
        tags: ["Flask", "React.js", "SQLite", "Firebase"],
        featured: false,
        details: {
            overview: "Helps users achieve health goals with personalized meal plans and nutritional insights.",
            goals: [
                "Generate diet plans based on user details",
                "Calculate caloric and nutrient needs",
                "Provide Indian food-based recommendations",
                "Allow customization and alternatives",
            ],
            challenges: [
                "Handling diverse dietary requirements",
                "Calculating accurate nutritional values",
                "Designing user-friendly interface",
                "Ensuring data accuracy",
            ],
            solutions: [
                "Used custom algorithm for nutritional calculation",
                "Developed responsive UI with React.js",
                "Integrated SQLite/Firebase for data storage",
                "Allowed meal swaps and alternatives",
            ],
            techStack: ["Frontend: React.js", "Backend: Flask (Python)", "Database: SQLite/Firebase"],
        },
    },
    {
        id: "project9",
        title: "Chit-Chat",
        description: "A real-time messaging web application for seamless communication.",
        image: "/chit-chat.webp?height=600&width=800",
        demoUrl: "https://chit-chat-ukc2.onrender.com/",
        githubUrl: "https://github.com/IMxMaYur",
        category: "web",
        tags: ["Node.js", "Express.js", "MongoDB", "WebSockets"],
        featured: false,
        details: {
            overview: "Provides instant messaging with a clean, responsive interface and live deployment.",
            goals: [
                "Enable real-time communication",
                "Maintain responsive design",
                "Ensure efficient message storage",
                "Offer stable online deployment",
            ],
            challenges: [
                "Maintaining low latency",
                "Handling multiple concurrent chats",
                "Storing chat history efficiently",
                "Keeping UI clean and fast",
            ],
            solutions: [
                "Used WebSockets for real-time messaging",
                "Implemented MongoDB for storage",
                "Designed minimal UI for speed",
                "Deployed on Render for accessibility",
            ],
            techStack: [
                "Frontend: HTML, CSS, JavaScript",
                "Backend: Node.js, Express.js",
                "Database: MongoDB",
                "Real-time: WebSockets",
            ],
        },
    },
]
