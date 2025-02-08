import Pusher from "pusher";

const pusher = new Pusher({
  appId: "1936936",
  key: "c944918e9a9c0f6f3553",
  secret: "1aa7f2c772c8d0fe1944",
  cluster: "eu",
  useTLS: true
});

interface MarkerBody {
  id: string,
  lat: number,
  lan: number
}


export default defineEventHandler(async (event) => {
  const body: MarkerBody = JSON.parse(await readBody(event))
  console.log("map-" + body.id)
  pusher.trigger("map-" + body.id , "change-marker", body);

  return 'ok'
})




