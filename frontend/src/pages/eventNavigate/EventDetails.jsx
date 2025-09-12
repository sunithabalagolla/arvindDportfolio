import { useParams } from "react-router-dom";

export default function EventDetails() {
  const { id } = useParams();

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold">Event Details Page</h1>
      <p>Showing details for event ID: {id}</p>
    </div>
  );
}
