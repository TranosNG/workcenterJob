const ProgressBar = (props) => {
  const { completed } = props;

  const containerStyles = {
    height: 20,
    width: '100%',
    backgroundColor: "#e0e0de",
    borderRadius: 10,
    // margin: 10
  }

  const fillerStyles = {
    height: '100%',
    width: `${completed}%`,
    backgroundColor: '#303C7B',
    // backgroundColor: '#6a1b9a',
    borderRadius: 'inherit',
    textAlign: 'right'
  }

  const labelStyles = {
    padding: 5,
    color: 'white',
    fontWeight: 'bold'
  }

  return (
    <div style={containerStyles}>
      <div style={fillerStyles}>
        <span style={labelStyles}>{`${completed}%`}</span>
      </div>
    </div>
  );
};

export default ProgressBar;