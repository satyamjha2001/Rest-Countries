import { useParams } from "react-router";

export default function Contact() {
  console.log("hiii");
  const params = useParams();
  console.log(params);
  return (
    <>
      <h1>Contact Us</h1>
    </>
  );
}
