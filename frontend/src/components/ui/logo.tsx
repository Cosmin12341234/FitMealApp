import {
    GiLotus
} from 'react-icons/gi'
const Logo = () => {
    return (
        <div className="flex items-center gap-3">
            <div className="relative">
                <GiLotus className="text-white text-5xl" />
            </div>
            <div className="text-white text-6xl font-bold"
                 style={{
                     fontFamily: 'Roboto',
                     letterSpacing: '0.1em',
                     fontWeight: 900
                 }}>
                NENYV
            </div>
        </div>
    );
};

export { Logo };