import SvgIcon from '@mui/material/SvgIcon';

function HomeIcon(props) {
  return (
    <SvgIcon {...props}>
      <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
    </SvgIcon>
  );
}

const Sidebar = () =>{

    const menuItems = [
        {
            id: "1",
            label: 'Home',
            icon: <HomeIcon style={{color: '#798099'}}/>,
        }
    ]


    return (
        <div className='sidebar'>
            {
                menuItems.map((item) =>{
                    
                    return (
                    <div key={item.id} className='menu-item'>
                        {item.icon}
                        {item.label}
                    </div>)
                })
            }
        </div>
    );
}

export default Sidebar;