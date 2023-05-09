
import { useState } from "react";

import Page from "./Page";
import Heading from "../Heading";
import Input from "../Input/Input";
import { FieldValues, useForm } from "react-hook-form";
import { UpdateInput } from "../../chromeServices/ChromeMessageSender";

export const VATWeights = [1, 2, 1, 2, 1, 2, 4, 1];
export const VerifyMultiple = 10;

const GeneratorPage = () => {
    const [isLoading] = useState(false);

    const {
        register,
        handleSubmit,
        setValue,
        watch,
        formState: {
            errors,
        }
    } = useForm<FieldValues>({
        defaultValues: {
            VAT: ''
        }
    });

    const VAT = watch('VAT');

    const setCustomValue = (id: string, value: any) => {
        setValue(id, value, {
            shouldDirty: true,
            shouldTouch: true,
            shouldValidate: true
        });
    }

    //#region Generate
    const onGenerate = () => {
        console.log("onGenerate");
        setCustomValue("VAT", generateVAT());
    }
    const generateVAT = () => {
        var randomNum: string | null = null;
        while (true) {
            randomNum = Math.random().toFixed(VATWeights.length).substr(2);
            // console.log(randomNum)
            if (checkVAT(randomNum) === true) {
                break;
            }
        }

        return randomNum;
    }
    const checkVAT = (value: any) => {
        const VATValue = (value as string).toString();
        const VATArr = VATValue.split('');

        // 乘上權重
        const weightedVATArr = VATArr.map((v, i) => {
            return (v as unknown as number) * VATWeights[i];
        })
        // 分離十位跟個位
        const digitVATArr = weightedVATArr.map(weighted => {
            return {
                tensDigit: Math.floor(weighted / 10),
                unitsDigit: weighted % 10
            }
        })

        const error = "格式錯誤"
        const aggregateVATArr = digitVATArr.reduce((currVal, b) => currVal + b.tensDigit + b.unitsDigit, 0) % VerifyMultiple;

        if (VATArr[6] === "7") {
            return aggregateVATArr === 1 || aggregateVATArr === 0 || error;
        }
        return aggregateVATArr === 0 || error;
    }
    //#endregion

    const onInsert = () => {
        UpdateInput('vat', VAT);
        console.log("check");
    }

    const bodyContent = (
        <div className=" flex flex-col gap-4">
            <Heading
                title="統一編號產生器"
                subtitle="隨機產生符合規則的統一編號或身分證號"
            />
            <Input
                id="VAT"
                label="統一編號"
                register={register}
                validate={checkVAT}
                errors={errors}
            />
        </div>
    )

    return (
        <Page
            disable={isLoading}
            title="產生器"
            onClose={() => { }}
            body={bodyContent}
            secondaryActionLable="產生"
            secondaryAction={onGenerate}
            actionLable="寫入"
            onSubmit={handleSubmit(onInsert)}
        />
    )
}

export default GeneratorPage;