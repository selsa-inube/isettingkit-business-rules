import { useState } from "react";
import {
  MdApps,
  MdOutlineApps,
  MdOutlineCategory,
  MdOutlineMoreVert,
} from "react-icons/md";

import { Icon, IOption, useMediaQuery } from "@inubekit/inubekit";

import { Filter } from "..";
import { FormFilter } from "../FormFilter";
import { FilterModal } from "../ModalFilter";
import { IFilterTag } from "../types/IFilterTag";

const FilterController = () => {
  const [filters, setFilters] = useState({
    apps: "",
    clients: "",
  });

  const [appliedValues, setAppliedValues] = useState({
    apps: "",
    clients: "",
  });

  const [showModal, setShowModal] = useState(false);

  const handleFilterChange = (name: string, values: string) => {
    setFilters((prev) => ({ ...prev, [name]: values }));
  };

  const handleClear = () => {
    setFilters({ apps: "", clients: "" });
    setAppliedValues({ apps: "", clients: "" });
  };

  const handleApply = () => {
    setAppliedValues(filters);
    setShowModal(false);
  };

  const handleOpenModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const appLabelMap: Record<string, string> = {
    app1: "Aplicación 1",
    app2: "Aplicación 2",
    app3: "Aplicación 3",
    app4: "Aplicación 4",
    app5: "Aplicación 5",
  };

  const clientLabelMap: Record<string, string> = {
    suite: "Suite Clientes",
    cartera: "Cartera",
  };

  const appliedFilters: IFilterTag[] = [
    ...appliedValues.apps
      .split(",")
      .filter(Boolean)
      .map((app) => ({
        icon: <MdOutlineApps />,
        label: appLabelMap[app] || app,
      })),
    appliedValues.clients && {
      icon: <MdOutlineCategory />,
      label: clientLabelMap[appliedValues.clients] || appliedValues.clients,
    },
  ].filter((item): item is IFilterTag => !!item);

  const formFields = [
    {
      icon: <MdApps />,
      label: "Aplicaciones",
      name: "apps",
      options: [
        { id: "app1", value: "app1", label: "Aplicación 1" },
        { id: "app2", value: "app2", label: "Aplicación 2" },
        { id: "app3", value: "app3", label: "Aplicación 3" },
        { id: "app4", value: "app4", label: "Aplicación 4" },
        { id: "app5", value: "app5", label: "Aplicación 5" },
      ] as IOption[],
      values: filters.apps,
    },
    {
      icon: <MdOutlineCategory />,
      label: "Clientes",
      name: "clients",
      options: [
        { id: "suite", value: "suite", label: "Suite Clientes" },
        { id: "cartera", value: "cartera", label: "Cartera" },
      ] as IOption[],
      values: filters.clients,
    },
  ];

  const isMobile = useMediaQuery("(max-width: 768px)");

  return (
    <>
      {isMobile ? (
        <>
          <Icon
            appearance={"primary"}
            icon={<MdOutlineMoreVert />}
            onClick={handleOpenModal}
          />{" "}
          {showModal && (
            <FilterModal
              actionButtonLabel="Filtrar"
              cancelButtonLabel="Quitar"
              onClick={handleApply}
              onCloseModal={handleCloseModal}
              portalId="portalModal"
              title="Filtrar"
            >
              <FormFilter
                appliedFilters={appliedFilters}
                fields={formFields}
                onChange={handleFilterChange}
              />
            </FilterModal>
          )}
        </>
      ) : (
        <>
          <Filter
            appliedFilters={appliedFilters}
            onClear={handleClear}
            onClick={handleOpenModal}
            titleClearFilter="Quitar"
            titleFilter="Filtrar"
          />
          {showModal && (
            <FilterModal
              actionButtonLabel="Filtrar"
              cancelButtonLabel="Quitar"
              onClick={handleApply}
              onCloseModal={handleCloseModal}
              portalId="portalModal"
              title="Filtrar"
            >
              <FormFilter
                appliedFilters={appliedFilters}
                fields={formFields}
                onChange={handleFilterChange}
              />
            </FilterModal>
          )}
        </>
      )}
    </>
  );
};

export { FilterController };
