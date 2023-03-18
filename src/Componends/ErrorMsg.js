import React from 'react'
import { Alert } from 'react-bootstrap'

function ErrorMsg({ variant = "info", children })
{
    return (
        <div>
            <Alert variant={variant} style={{ frontSize: 20 }}>
                <strong>{children}</strong>
            </Alert>
        </div>
    )
}

export default ErrorMsg;
