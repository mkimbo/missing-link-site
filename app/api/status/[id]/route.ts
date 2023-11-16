import { getTenantFromCookies } from "@/auth/server-auth-provider";
import { serverDB } from "@/lib/firebase";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const id = params.id;
  try {
    if (!id) {
      return Response.error;
    }
    const userID = id;
    console.log("got logged in user", userID);
    const user = await serverDB
      .collection(process.env.FIREBASE_FIRESTORE_USER_COLLECTION!)
      .doc(userID)
      .get();
    if (!user.exists) return Response.error;
    return Response.json({ user: user.data() }, { status: 200 });
  } catch (error) {
    console.log("error fetching user", error);
    return Response.error;
  }
}
