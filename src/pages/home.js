import Sidebar from '../components/sidebar';
import Header from '../components/header';
import Content from '../components/content';

const Home = () => {
  return (
    <div className='home-container'>
        <div className='sidebar-container' >
            <Sidebar />
        </div>
        <div className='header-container'>
            <Header />

            <div className='content-container'>
                <Content/>
            </div>
        </div>

    </div>
  );
}

export default Home
