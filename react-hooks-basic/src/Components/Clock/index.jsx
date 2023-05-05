import useClock from '../../hooks/useClock';
Clock.propTypes = {};

function Clock() {
    const { timeString } = useClock();
    return (
        <p style={{fontSize:'50px', textAlign:'center'}}>{timeString}</p>
    );
}

export default Clock;