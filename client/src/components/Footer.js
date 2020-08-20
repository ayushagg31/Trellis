import React from 'react'

export default function Footer() {
    return (
        <div style={{
            position: 'absolute', width: '100%',
            bottom: 0, height: '30px',
            backgroundColor: 'rgba(0,0,0,.32)',
            textAlign: 'center',
            fontWeight: 'bold',
            paddingTop: '10px',
            display: 'flex',
            justifyContent: 'space-between',
            fontFamily: 'Helvetica'
        }}>
            <div style={{ paddingLeft: '10px' }}>
                About the developer - Ayush Aggarwal
                <a href='https://ayushaggarwal.com'
                    rel='noopener noreferrer' target='_blank'
                    style={{ textDecoration: 'none' }}
                >
                    (https://ayushaggarwal.com)</a>
            </div>
            <div style={{ paddingRight: '10px' }}>
                Github Repo - Trellis
                <a href='https://github.com/ayushagg31/Trellis'
                    rel='noopener noreferrer' target='_blank'
                    style={{ textDecoration: 'none' }}
                >
                    (https://github.com/ayushagg31/Trellis)</a>
            </div>
        </div>
    )
}
