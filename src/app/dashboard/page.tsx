import * as actions from "@/actions";
import { auth } from "@/auth";

export default async function Dashboard() {
  const session = await auth();

  return (
    <div>
      <h1>Dashboard</h1>

      {session?.user ? (
        <div>{JSON.stringify(session.user)}</div>
      ) : (
        <div>Signed Out</div>
      )}
    </div>
  );
}
