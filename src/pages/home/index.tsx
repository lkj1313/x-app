import useAuth from "../../hooks/useAuth";

export default function HomePage() {
  useAuth();
  return <div>Welcome to the Home Page</div>;
}
