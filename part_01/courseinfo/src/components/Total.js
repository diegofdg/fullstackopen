const Total = ({ exercises }) => {
    return (
        <p>
            <b>
                Number of exercises {exercises[0] + exercises[1] + exercises[2]}            
            </b>
        </p>
    );
  }
  
  export default Total;