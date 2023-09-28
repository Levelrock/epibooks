import Navigation from "../Component/myNav/Navigation";
import Jumbotron from "../Component/welcome/Jumbotron";
import LatestRelease from "../Component/latestRelease/LatestRelease";
import { PostContext } from "../Context/PostContext";
import Footer from "../Component/footer/Footer";

function Home({asin}) {
  return (
    <PostContext>
      <Navigation />
      <Jumbotron />
      <LatestRelease bookid={asin} />
      <Footer/>
    </PostContext>
  );
}

export default Home;
