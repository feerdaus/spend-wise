import * as actions from "@/actions";
import { auth } from "@/auth";

export default async function Dashboard() {
  const session = await auth();

  return (
    <div>
      <h1>Dashboard</h1>
      <form className="mb-4" action={actions.signIn}>
        <button
          type="submit"
          className="bg-primary text-white px-4 py-2 rounded"
        >
          Sign In
        </button>
      </form>

      <form action={actions.signOut}>
        <button
          type="submit"
          className="bg-primary text-white px-4 py-2 rounded"
        >
          Sign Out
        </button>
      </form>

      {session?.user ? (
        <div>{JSON.stringify(session.user)}</div>
      ) : (
        <div>Signed Out</div>
      )}
    </div>
  );
}
