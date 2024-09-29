// Loader.tsx
const Loader = () => {
    return (
        <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="loader"></div>
            <style jsx>{`
                .loader {
                    border: 8px solid rgba(0, 0, 0, 0.1);
                    border-left-color: #3498db;
                    border-radius: 50%;
                    width: 50px;
                    height: 50px;
                    animation: spin 1s linear infinite;
                }
                @keyframes spin {
                    to {
                        transform: rotate(360deg);
                    }
                }
            `}</style>
        </div>
    );
};

export default Loader;