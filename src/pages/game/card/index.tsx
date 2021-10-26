import MainLayout from "layouts/main";
import useTransition from "next-translate/useTranslation";
import { Card } from "@/components/Basic";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { Checkbox, FormBlock } from "@/components/Form";
import { cleanArray } from "utils/array";
import { Attribute } from "models";
import {
  AttributeCheckbox,
  CardRearityCheckbox,
  UnitCheckbox,
} from "utils/constants";

type FilterData = {
  attribute: Attribute[];
  cardRearity: string[];
  unit: string[];
};

export default function CardList() {
  const {
    register,
    handleSubmit,
    watch,
    control,
    formState: { errors },
  } = useForm<FilterData>();
  const onSubmit = handleSubmit((data) => {
    console.log(cleanArray(data.attribute));
  });
  const { t } = useTransition("");
  return (
    <MainLayout
      breadThumbs={[
        { name: t("nav:game.name"), link: "" },
        { name: t("nav:game.card"), link: "/game/card" },
      ]}
      title={t("nav:game.card")}
    >
      <div>
        <Card title={t("common:filter")}>
          <form onSubmit={onSubmit}>
            <FormBlock label={t("common:attribute.name")}>
              <Checkbox
                name="attribute"
                control={control}
                list={AttributeCheckbox(t)}
              />
            </FormBlock>
            <FormBlock label={t("common:card_rearity.name")}>
              <Checkbox
                name="cardRearity"
                control={control}
                list={CardRearityCheckbox(t)}
              />
            </FormBlock>
            <FormBlock label={t("common:unit.name")}>
              <Checkbox name="unit" control={control} list={UnitCheckbox(t)} />
            </FormBlock>
            <button
              className="btn btn-sm btn-primary btn-outline"
              type="submit"
            >
              {t("common:search")}
            </button>
          </form>
        </Card>
      </div>
    </MainLayout>
  );
}
