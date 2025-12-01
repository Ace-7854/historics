export default function ErrorPage({error = "An unexpected error has occurred."}) {
    return (
        <div className="error-page">
            <h1 className="error-header">Error Occurred</h1>
            <p>{error}</p>
        </div>
    );
}