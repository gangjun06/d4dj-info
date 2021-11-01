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
  useCallback,
} from "react";

export const SettingContext = createContext<
  [boolean, Dispatch<SetStateAction<boolean>>] | null
>(null);

type FormData = {
  lang: string;
};

export const SettingProvider = ({ children }: { children: ReactNode }) => {
  const state = useState<boolean>(false);
  const { t, lang } = useTransition();
  const { handleSubmit, control } = useForm<FormData>({
    defaultValues: {
      lang,
    },
  });

  const onSubmit = handleSubmit((data) => {
    setLanguage(data.lang);
    localStorage.setItem("lang", data.lang);
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
          </div>
        </form>
      </div>
      {children}
    </SettingContext.Provider>
  );
};
