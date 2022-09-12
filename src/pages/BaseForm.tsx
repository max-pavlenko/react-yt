import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import PersonalInfoForm from '../components/Forms/Sign-up/PersonalInfoForm';
import { Box, Button, StepLabel } from '@mui/material';
import Stepper from '@mui/material/Stepper';
import { Fragment, useState } from 'react';
import { steps } from '../utils/constants';
import Step from '@mui/material/Step';
import Review from './form/Review';
import PasswordForm from '../components/Forms/Sign-up/PasswordForm';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

const BaseForm = () => {
    const [ currentStep, setCurrentStep ] = useState(0);


    function getStepContent(step: number) {
        switch (step) {
            case 0:
                return <PersonalInfoForm/>;
            case 1:
                return <PasswordForm/>;
            case 2:
                return <Review/>;
            default:
                throw new Error('Unknown step');
        }
    }

    function handleNextBtnClick(e: any) {
        setCurrentStep(curStep => curStep + 1);
    }

    function handleBackBtnClick(e: any) {
        setCurrentStep(curStep => curStep - 1);
    }

    function handleBaseFormSubmit(e: any) {
        e.preventDefault()
        // console.log(e)
    }

    return (
        <Container maxWidth = {'md'} sx = {{
            backgroundColor: '#111',
            padding: '15px 30px',
            marginTop: '30px',
        }} className = 'form-container'>
            <Typography textAlign = 'center' color = 'whitesmoke'
                        sx = {{paddingBottom: 1}} variant = "h4">
                Sign up
            </Typography>

            <Stepper sx = {{padding: 2, borderBottom: '1px solid #555', borderTop: '1px solid #555'}}
                     activeStep = {currentStep}>
                {steps.map(stepLabel => (
                    <Step key = {stepLabel}>
                        <StepLabel>{stepLabel}</StepLabel>
                    </Step>
                ))}
            </Stepper>

            <form onSubmit = {handleBaseFormSubmit}>
                <Box sx = {{display: 'flex'}} py = {2}>
                    {currentStep >= 1 && currentStep !== steps.length &&
                        <Button onClick = {handleBackBtnClick} color = 'warning' variant = 'outlined'>
                            {`${currentStep === 0 ? '' : 'Back'}`}
                        </Button>}

                    {currentStep !== steps.length &&
                        <Button style = {{marginLeft: 'auto'}}
                                type = {`${currentStep === steps.length ? 'submit' : 'button'}`}
                                onClick = {handleNextBtnClick} color = 'success' variant = 'contained'>
                            {`${currentStep === steps.length - 1 ? 'Submit' : 'Next'}`}
                        </Button>}
                </Box>
                <TransitionGroup component = {Fragment}>
                    <CSSTransition key = {currentStep} classNames = 'fade' timeout = {600}>
                        {getStepContent(currentStep)}
                    </CSSTransition>
                </TransitionGroup>
            </form>
        </Container>
    );
};

export default BaseForm;
