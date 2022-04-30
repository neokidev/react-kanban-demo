import { CSS } from "@dnd-kit/utilities";
import { ActionIcon, Paper, Text } from "@mantine/core";
import { useHover, useMergedRef } from "@mantine/hooks";
import classNames from "classnames";
import React from "react";
import { X } from "tabler-icons-react";

import styles from "./Item.module.css";

export const Item = React.memo(
  React.forwardRef(
    (
      {
        dragOverlay,
        dragging,
        listeners,
        transition,
        transform,
        id,
        value,
        setContainers,
        onClick,
        ...props
      },
      ref
    ) => {
      const { hovered, ref: hoverRef } = useHover();
      const mergedRef = useMergedRef(ref, hoverRef);

      return (
        <li
          className={classNames(
            styles.Wrapper,
            dragOverlay && styles.dragOverlay
          )}
        >
          <Paper
            className="relative m-1 w-full break-words border border-gray-200 px-4 py-3 hover:cursor-pointer hover:bg-gray-50"
            style={{
              transition,
              transform: CSS.Transform.toString(transform),
              opacity: dragging ? 0.5 : 1,
            }}
            radius="sm"
            ref={mergedRef}
            onClick={onClick}
            {...listeners}
          >
            <Text>{value}</Text>
            {hovered && !dragOverlay && (
              <div className="absolute top-0 left-0 flex h-full w-full justify-end p-0">
                <ActionIcon
                  className="h-full bg-gray-100 hover:bg-gray-200"
                  onClick={(e) => {
                    e.stopPropagation();
                    setContainers((containers) => {
                      const targetContainer = Object.keys(containers).find(
                        (key) =>
                          containers[key].items.some((item) => item.id === id)
                      );

                      return {
                        ...containers,
                        [targetContainer]: {
                          ...containers[targetContainer],
                          items: containers[targetContainer].items.filter(
                            (item) => item.id !== id
                          ),
                        },
                      };
                    });
                  }}
                >
                  <X size={14} />
                </ActionIcon>
              </div>
            )}
          </Paper>
        </li>
      );
    }
  )
);

Item.displayName = "Item";
