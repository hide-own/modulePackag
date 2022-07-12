import {inject, InjectionKey, Ref} from "vue";
import {TableContext, TableEmitter, TableFeatures} from "./types";
import {TailTableError} from "./utils";
import {UserPaginationReturn} from "@/hooks/usePagination";

export const tableContextKey: InjectionKey<TableContext> = Symbol.for("TableContext");
export const tableFeaturesKey: InjectionKey<Ref<TableFeatures>> = Symbol.for("TableFeatures");
export const tableEmitterKey: InjectionKey<TableEmitter> = Symbol.for('TableEmitter')
export const tablePaginationKey: InjectionKey<UserPaginationReturn> = Symbol.for('TablePagination')

function mustSymbol<T>(key: InjectionKey<T>): T {
  const value = inject(key);
  if (value == null) {
    throw new TailTableError("Without TailTable");
  }
  return value;
}

export function mustTableContext(): TableContext {
  return mustSymbol(tableContextKey);
}

export function mustTableFeatures(): Ref<TableFeatures> {
  return mustSymbol(tableFeaturesKey);
}

export function mustTableEmitter(): TableEmitter {
  return mustSymbol(tableEmitterKey);
}
