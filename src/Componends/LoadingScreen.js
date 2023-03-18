import React from 'react'
import { Spinner, SplitButton } from "react-bootstrap";
function LoadingScreen({ size = 100 })
{
    return (
        <div
            style={{
                display: "flex",
                justifyContent: 'center',
                alignItems: "center",
                width: "100%",
                height: "100%",
            }}>
            <Spinner
                style={{
                    width: size,
                    height: size,
                }}
                animation="border"
            />

        </div>
    )
}

export default LoadingScreen
