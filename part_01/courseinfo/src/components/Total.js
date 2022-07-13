const Total = ({ exercises }) => {
    const total = exercises.reduce((s, p) => s + p)

    return (
        <p>
            <b>
                total of {total} exercises
            </b>
        </p>
    );
  }
  
  export default Total;