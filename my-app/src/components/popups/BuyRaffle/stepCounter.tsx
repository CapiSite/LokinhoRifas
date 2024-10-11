const StepCounter = ({steps}: { steps: {step: number} }) => {

  const { step } = steps

  return (
    <div className="stepCounter desktop">
      <div className={`step-1 ${step == 1 && 'selected'}`}>
        <div className="bar">
          <div className="ball">1</div>
        </div>
        <h3>Selecionar Rifas</h3>
      </div>
      <div className={`step-2 ${step == 2 && 'selected'}`}>
        <div className="bar">
        <div className="ball">2</div>
        </div>
        <h3>Selecionar Quantidade</h3>
      </div>
      <div className={`step-3 ${(step == 3 || step == 4) && 'selected'}`}>
        <div className="bar">
        <div className="ball">3</div>
        </div>
        <h3>Pagamento</h3>
      </div>
    </div>
  );
}
 
export default StepCounter;