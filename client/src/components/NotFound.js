import React from 'react'
import Header from './Header'
import HomeIcon from '@material-ui/icons/Home'
export default function NotFound() {
    return (
        <div>
            <Header btnText={'Home'} path={'/'} icon={<HomeIcon fontSize='small' />} />
            <div style={{
                position: 'fixed',
                top: '45%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                height: '40px',
                width: '200px',
                textAlign: 'center',
                fontWeight: 'bold'
            }}>
               404!  Page Not Found
            </div>
        </div>
    )
}
