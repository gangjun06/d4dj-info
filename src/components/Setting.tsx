import { useCallback } from "react";
import { useForm } from "react-hook-form";
import useTransition from "next-translate/useTranslation";
import setLanguage from "next-translate/setLanguage";
import { FormBlock, Radio } from "./Form";
import {
  useState,
  createContext,
  ReactNode,
  SetStateAction,
  Dispatch,
} from "react";

export const SettingContext = createContext<
  [boolean, Dispatch<SetStateAction<boolean>>] | null
>(null);

type FormData = {
  lang: string;
};

export const SettingProvider = ({ children }: { children: ReactNode }) => {
  const { handleSubmit, control } = useForm<FormData>();
  const state = useState<boolean>(false);
  const { t } = useTransition();

  const onSubmit = handleSubmit((data) => {
    setLanguage(data.lang);
    state[1](false);
  });

  return (
    <SettingContext.Provider value={state}>
      <div className={`modal z-50 ${state[0] ? "modal-open" : ""}`}>
        <form className="modal-box">
          <FormBlock label={t("common:language")}>
            <Radio
              control={control}
              name="lang"
              list={[
                { label: "Korean", value: "ko" },
                { label: "English", value: "en" },
              ]}
            />
          </FormBlock>
          <div className="modal-action">
            <button className="btn btn-primary" onClick={onSubmit}>
              {t("common:save")}
            </button>
            <button className="btn" onClick={() => state[1](false)}>
              {t("common:cancel")}
            </button>
          </div>
        </form>
      </div>
      {children}
    </SettingContext.Provider>
  );
};
