import { useRouteError } from "react-router";

export default function Error() {
    const error = useRouteError();
    console.log(error);
    
    return (
      <div style={{ textAlign:"center" }}>
        <h1>{error.status}</h1>
        <h1>Something went wrong!!</h1>
      </div>
    );
}
