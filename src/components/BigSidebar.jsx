import Navlinks from './Navlinks';
import Logo from '../components/Logo';
import Wrapper from '../assets/wrappers/BigSidebar';
import { useSelector } from 'react-redux';

const BigSidebar = () => {
  const {isSidebarOpen} = useSelector((state)=> state.user)

  return (
    <Wrapper>
      <div className={isSidebarOpen ? 'sidebar-container ' : 'sidebar-container show-sidebar'}>
        <div className="content">
          <header>
            <Logo/>
          </header>
          <Navlinks/>
        </div>
      </div>
      
    </Wrapper>
  )
}

export default BigSidebar
