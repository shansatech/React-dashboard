<AppBar style={{ position: 'relative', background: 'linear-gradient(45deg, #332e36, #80b6c7 )', borderRadius: '25px' }}>
    <Toolbar style={{ justifyContent: 'space-between', size: '30px' }}>
        <Typography variant='h4'>Shopping Cart</Typography>
        <Grid style={{ display: 'flex', justifyContent: 'space-between', size: '30px' }}>
            <Badge color="secondary" badgeContent={countCartItems} position="relative" style={{ marginRight: "30px", display: 'flex', alignItems: 'bottom' }}>
                <ShoppingCartIcon />{' '}
            </Badge>
            <Button variant='contained' onClick={handleLogout}>Sign-out</Button>
        </Grid>
    </Toolbar>
</AppBar>

{
    SidebarData.map((item, index) => {
        return (
            <li key={index} className={item.className}>
                <Link to={item.path}>
                    {item.icon}
                    <span>{item.title}</span>
                </Link>
            </li>
        )
    })
}

<AppBar style={{ position: 'relative', background: 'linear-gradient(45deg, #332e36, #80b6c7 )', borderRadius: '25px' }}>
    <Toolbar style={{ justifyContent: 'space-between', size: '30px' }}>
        <Typography variant='h4'>Shopping Cart</Typography>
        <Grid style={{ display: 'flex', justifyContent: 'space-between', size: '30px' }}>
            <Button variant='contained' >Sign-out</Button>
        </Grid>
    </Toolbar>
</AppBar>

{/* <nav >

<ul className='nav-menu-items' onClick={this.showSidebar}>
    <div style={{ display: 'flex', justifyContent: 'space-between' }}> <li className='navbar-toggle'>
        <Link to='#' className='menu-bars'>
            <FaIcons.FaBars />
        </Link>
    </li>
        <div style={{ color: 'white' width: '100%'}}>
            Shopping Cart
        </div></div>

    {SidebarData.map((item, index) => {
        return (
            <li key={index} className={item.className}>
                <Link to={item.path}>
                    {item.icon}
                    <span>{item.title}</span>
                </Link>
            </li>
        )
    })}
    {console.log(SidebarData)}
</ul>
{/* <div className='sidebar-footer'>
<span className='sidebar-item-label'>Logout</span>
<Logout alt='icon-logout'
    className='sidebar-item-icon' />
</div> 
</nav > */}
