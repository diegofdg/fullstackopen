import Part from './Part';

const Content = ({ parts }) => {
    return (
        <div>
            {
                parts.map((element) =>
                    <Part
                        key={element.id}
                        name={element.name}
                        exercises={element.exercises}
                    />
                )
            }
        </div>
    );
}

export default Content;