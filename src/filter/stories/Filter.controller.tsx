import { useMemo, useState, useCallback } from "react";
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

const appLabelMap: Record<string, string> = {
  app1: "Aplicación 1",
  app2: "Aplicación 2",
  app3: "Aplicación 3",
  app4: "Aplicación 4",
  app5: "Aplicación 5",
  app6: "Aplicación 6",
  app7: "Aplicación 7",
  app8: "Aplicación 8",
  app9: "Aplicación 9",
  app10: "Aplicación 10",
  app11: "Aplicación 11",
  app12: "Aplicación 12",
  app13: "Aplicación 13",
  app14: "Aplicación 14",
  app15: "Aplicación 15",
};

const clientLabelMap: Record<string, string> = {
  suite: "Suite Clientes",
  cartera: "Cartera",
};

const FilterController = () => {
  const [filters, setFilters] = useState({ apps: "", clients: "" });
  const [appliedValues, setAppliedValues] = useState({ apps: "", clients: "" });
  const [showModal, setShowModal] = useState(false);

  const handleFilterChange = useCallback((name: string, values: string) => {
    setFilters((prev) => ({ ...prev, [name]: values }));
  }, []);

  const handleClear = useCallback(() => {
    setFilters({ apps: "", clients: "" });
    setAppliedValues({ apps: "", clients: "" });
  }, []);

  const handleApply = useCallback(() => {
    setAppliedValues(filters);
    setShowModal(false);
  }, [filters]);

  const removeApp = useCallback(
    (app: string) => {
      const next = filters.apps
        .split(",")
        .filter((value) => value && value !== app)
        .join(",");
      setFilters((prev) => ({ ...prev, apps: next }));
      setAppliedValues((prev) => ({ ...prev, apps: next }));
    },
    [filters.apps],
  );

  const removeClient = useCallback(() => {
    setFilters((prev) => ({ ...prev, clients: "" }));
    setAppliedValues((prev) => ({ ...prev, clients: "" }));
  }, []);

  const appliedFilters: IFilterTag[] = useMemo(() => {
    const appFilters = appliedValues.apps
      .split(",")
      .filter(Boolean)
      .map((app) => ({
        id: `app-${app}`,
        icon: <MdOutlineApps />,
        label: appLabelMap[app] || app,
        removable: true,
        onClose: () => removeApp(app),
      }));

    const clientFilter =
      appliedValues.clients &&
      ({
        id: `client-${appliedValues.clients}`,
        icon: <MdOutlineCategory />,
        label: clientLabelMap[appliedValues.clients] || appliedValues.clients,
        removable: true,
        onClose: removeClient,
      } as IFilterTag);

    return clientFilter ? [...appFilters, clientFilter] : appFilters;
  }, [appliedValues, removeApp, removeClient]);

  const formFields = [
    {
      icon: <MdApps />,
      label: "Aplicaciones",
      name: "apps",
      options: Object.keys(appLabelMap).map((key) => ({
        id: key,
        value: key,
        label: appLabelMap[key],
      })) as IOption[],
      values: filters.apps,
    },
    {
      icon: <MdOutlineCategory />,
      label: "Clientes",
      name: "clients",
      options: Object.keys(clientLabelMap).map((key) => ({
        id: key,
        value: key,
        label: clientLabelMap[key],
      })) as IOption[],
      values: filters.clients,
    },
  ];

  const isMobile = useMediaQuery("(max-width: 768px)");

  return (
    <>
      {isMobile ? (
        <>
          <Icon
            appearance="primary"
            icon={<MdOutlineMoreVert />}
            onClick={() => setShowModal(true)}
          />
          {showModal && (
            <FilterModal
              actionButtonLabel="Filtrar"
              cancelButtonLabel="Quitar"
              onClick={handleApply}
              onCloseModal={() => setShowModal(false)}
              portalId="portalModal"
              title="Filtrar"
            >
              <FormFilter
                appliedFilters={appliedFilters}
                fields={formFields}
                onChange={handleFilterChange}
                noFiltersLabel="Sin filtros aún."
              />
            </FilterModal>
          )}
        </>
      ) : (
        <>
          <Filter
            appliedFilters={appliedFilters}
            onClear={handleClear}
            onClick={() => setShowModal(true)}
            titleClearFilter="Quitar"
            titleFilter="Filtrar"
            noFiltersLabel="Sin filtros aún."
          />
          {showModal && (
            <FilterModal
              actionButtonLabel="Filtrar"
              cancelButtonLabel="Quitar"
              onClick={handleApply}
              onCloseModal={() => setShowModal(false)}
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
