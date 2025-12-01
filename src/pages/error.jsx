export default function ErrorPage({error = "An unexpected error has occurred."}) {
    return (
        <div style={{ textAlign: 'center', marginTop: '50px' }}>
            <h1>Error Occurred</h1>
            <p>{error}</p>
        </div>
    );
}