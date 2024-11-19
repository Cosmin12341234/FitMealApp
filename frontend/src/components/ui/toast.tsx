import { Toaster as SonnerToaster } from 'sonner'

export const Toaster = () => {
    return (
        <SonnerToaster
            position="bottom-right"
            toastOptions={{
                style: {
                    background: 'white',
                    border: '1px solid #b68d40',
                    color: '#122620',
                },
            }}
        />
    )
}

export { toast } from 'sonner'