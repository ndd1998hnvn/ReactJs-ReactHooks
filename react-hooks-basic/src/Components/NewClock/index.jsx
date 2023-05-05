import useClock from '../../hooks/useClock';
import './NewClock.scss'
NewClock.propTypes = {};

function NewClock() {
    const { timeString } = useClock();
    return (
        <div className='new-clock'>
            <p>{timeString}</p>
        </div>
    );
}

export default NewClock;