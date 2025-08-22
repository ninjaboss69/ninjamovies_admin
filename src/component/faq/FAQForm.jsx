import { useForm } from "react-hook-form";
import Input from '../common/form/Input';

const FAQForm = ({ id, formData, onConfirm }) => {

    const {
        handleSubmit,
        register,
        formState: { errors },
    } = useForm({
        defaultValues: {
            publish: id === 'edit_form' ? formData.publish : false,
            question: id === 'edit_form' ? formData.question : "",
            answer: id === 'edit_form' ? formData.answer : '',

        },
    })


    const onSubmit = (formData) => {

        onConfirm(formData)
    }
    return (
        <form className='w-full flex flex-col gap-4 ' onSubmit={handleSubmit(onSubmit)} >
            {/* publish */}
            <div >
                <Input
                    label='Publish'
                    name="publish"
                    type="checkbox"
                    register={register}
                    errors={errors}
                />
            </div>
            {/* question */}
            <div >
                <Input
                    placeholder='Question'
                    label='Question'
                    name="question"
                    validate={{ required: true }}
                    register={register}
                    errors={errors}
                />
            </div>
            {/* answer */}
            <div >
                <Input
                    placeholder='Answer'
                    label='Answer'
                    name="answer"
                    validate={{ required: true }}
                    register={register}
                    errors={errors}
                />
            </div>


        </form>
    )
}

export default FAQForm