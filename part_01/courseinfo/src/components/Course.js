import Content from './Content';
import Header from './Header';
import Total from './Total';

const Course = ({ course }) => {
    return (
        <div>
            <Header
                course={course.name}
            />
            <Content
                parts={course.parts}
            />
            <Total
                exercises={course.parts.map(c => c['exercises'])}
            />
        </div>
    );
}

export default Course;