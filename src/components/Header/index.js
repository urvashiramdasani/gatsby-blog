import React from 'react'
import { Link } from 'gatsby'

// Hooks
import { useConfigQuery } from 'hooks/useConfigQuery'

// Styles
import { Wrapper, Logo } from './Header.styles'

// Components
import Menu from 'components/Menu'

const Header = ({ siteTitle = `` }) => {
    const siteConfig = useConfigQuery()
  return (
    <Wrapper>
      <Menu items={siteConfig.menu} />
      <Link to='/'>
        <Logo src={siteConfig.logo.publicURL} alt={siteTitle} />
      </Link>
      <div>Theme Button</div>
    </Wrapper>
  )
}

export default Header
