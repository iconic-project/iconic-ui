const field = 'rounded-md font-normal font-sans disabled:opacity-40 bg-(--bg-surface) text-(--fg-default) ring ring-inset ring-(--border-default)'
const fieldFocus = 'focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-(--hilo-blue-500)'
const menu = 'rounded-lg shadow-[var(--shadow-md)] bg-(--bg-surface) ring ring-(--border-subtle)'

export default defineAppConfig({
  iconic: {
    displayTimeZone: 'UTC',
  },

  ui: {
    colors: {
      primary: 'hilo',
      success: 'gain',
      warning: 'caution',
      info: 'hilo',
      error: 'alert',
      neutral: 'ink',
    },

    button: {
      slots: {
        base: 'rounded-md font-sans font-medium text-[13px] tracking-normal normal-case disabled:opacity-40 aria-disabled:opacity-40 transition-[background,border-color,color,box-shadow] duration-150 ease-[var(--ease)]',
      },
      variants: {
        size: {
          md: {
            base: 'px-4 py-2 text-[13px] gap-2',
          },
        },
      },
      compoundVariants: [
        { color: 'primary', variant: 'solid', class: 'text-white bg-(--hilo-blue-500) hover:bg-(--hilo-blue-600) active:bg-(--hilo-blue-700)' },
        { color: 'secondary', variant: 'solid', class: 'hover:bg-secondary active:bg-secondary' },
        { color: 'success', variant: 'solid', class: 'text-white hover:bg-success active:bg-success' },
        { color: 'info', variant: 'solid', class: 'text-white hover:bg-info active:bg-info' },
        { color: 'warning', variant: 'solid', class: 'hover:bg-warning active:bg-warning' },
        { color: 'error', variant: 'solid', class: 'text-white hover:bg-error active:bg-error' },
        { color: 'neutral', variant: 'solid', class: 'bg-(--neutral-950) text-(--neutral-25) hover:bg-(--neutral-800) active:bg-(--neutral-800) dark:bg-(--neutral-25) dark:text-(--neutral-950) dark:hover:bg-(--neutral-50)' },
        { color: 'primary', variant: 'outline', class: 'bg-(--bg-surface) text-(--fg-default) ring ring-inset ring-(--border-default) hover:bg-(--bg-surface-alt) hover:ring-(--hilo-blue-500) active:bg-(--bg-surface-alt)' },
        { color: 'secondary', variant: 'outline', class: 'bg-(--bg-surface) text-(--fg-default) ring ring-inset ring-(--border-subtle) hover:bg-(--bg-surface-alt) hover:ring-(--border-default) active:bg-(--bg-surface-alt)' },
        { color: 'success', variant: 'outline', class: 'bg-(--bg-surface) text-(--fg-default) ring ring-inset ring-(--border-subtle) hover:bg-(--bg-surface-alt) hover:ring-(--border-default) active:bg-(--bg-surface-alt)' },
        { color: 'info', variant: 'outline', class: 'bg-(--bg-surface) text-(--fg-default) ring ring-inset ring-(--border-subtle) hover:bg-(--bg-surface-alt) hover:ring-(--border-default) active:bg-(--bg-surface-alt)' },
        { color: 'warning', variant: 'outline', class: 'bg-(--bg-surface) text-(--fg-default) ring ring-inset ring-(--border-subtle) hover:bg-(--bg-surface-alt) hover:ring-(--border-default) active:bg-(--bg-surface-alt)' },
        { color: 'error', variant: 'outline', class: 'bg-(--bg-surface) text-(--fg-default) ring ring-inset ring-(--border-subtle) hover:bg-(--bg-surface-alt) hover:ring-(--border-default) active:bg-(--bg-surface-alt)' },
        { color: 'neutral', variant: 'outline', class: 'bg-(--bg-surface) text-(--fg-default) ring ring-inset ring-(--border-subtle) hover:bg-(--bg-surface-alt) hover:ring-(--border-default) active:bg-(--bg-surface-alt) disabled:bg-(--bg-surface) aria-disabled:bg-(--bg-surface)' },
      ],
    },

    input: {
      slots: {
        base: 'rounded-md font-normal disabled:opacity-40',
      },
      variants: {
        size: {
          md: {
            base: 'px-3 py-2.5 text-[14px] md:text-[14px] font-sans',
          },
          sm: {
            base: 'px-2.5 py-2 text-[13px] font-sans',
          },
        },
        variant: {
          outline: field,
        },
      },
      compoundVariants: [
        { color: 'primary', variant: ['outline', 'subtle'], class: fieldFocus },
        { color: 'neutral', variant: ['outline', 'subtle'], class: fieldFocus },
        { fixed: false, size: 'md', class: 'md:text-[14px]' },
        { fixed: false, size: 'sm', class: 'md:text-[13px]' },
      ],
    },

    textarea: {
      slots: {
        base: 'rounded-md font-normal font-sans disabled:opacity-40',
      },
      variants: {
        size: {
          md: {
            base: 'px-3 py-2.5 text-[14px] md:text-[14px]',
          },
        },
        variant: {
          outline: field,
        },
      },
      compoundVariants: [
        { color: 'primary', variant: ['outline', 'subtle'], class: fieldFocus },
        { color: 'neutral', variant: ['outline', 'subtle'], class: fieldFocus },
        { fixed: false, size: 'md', class: 'md:text-[14px]' },
      ],
    },

    inputDate: {
      slots: {
        base: 'rounded-md font-normal disabled:opacity-40 w-full',
        segment: 'rounded-sm',
      },
      variants: {
        size: {
          md: {
            base: 'px-3 py-2.5 text-[14px] md:text-[14px] font-sans',
            segment: 'text-[14px] font-sans',
          },
          sm: {
            base: 'px-2.5 py-2 text-[13px] font-sans',
            segment: 'text-[13px] font-sans',
          },
        },
        variant: {
          outline: field,
        },
      },
      compoundVariants: [
        { color: 'primary', variant: ['outline', 'subtle'], class: 'has-focus-visible:ring-2 has-focus-visible:ring-inset has-focus-visible:ring-(--hilo-blue-500)' },
        { color: 'neutral', variant: ['outline', 'subtle'], class: 'has-focus-visible:ring-2 has-focus-visible:ring-inset has-focus-visible:ring-(--hilo-blue-500)' },
        { fixed: false, size: 'md', class: 'md:text-[14px]' },
        { fixed: false, size: 'sm', class: 'md:text-[13px]' },
      ],
    },

    calendar: {
      slots: {
        root: 'bg-(--bg-surface)',
        headingLabel: 'font-sans font-normal text-[13px] tracking-normal',
        headCell: 'rounded-md font-sans text-[11px] uppercase tracking-[0.06em]',
        cellTrigger: 'rounded-md',
      },
      variants: {
        view: {
          day: {
            cellTrigger: 'rounded-md',
          },
          month: {
            cellTrigger: 'rounded-md',
          },
          year: {
            cellTrigger: 'rounded-md',
          },
        },
      },
    },

    popover: {
      slots: {
        content: menu,
      },
    },

    select: {
      slots: {
        base: 'rounded-md font-normal disabled:opacity-40',
        content: menu,
        item: 'rounded-md before:rounded-md',
      },
      variants: {
        size: {
          md: {
            base: 'px-3 py-2.5 text-[14px] md:text-[14px] font-sans',
          },
          sm: {
            base: 'px-3 py-2 text-[13px] font-sans bg-(--bg-surface)',
          },
        },
        variant: {
          outline: `${field} hover:bg-(--bg-surface)!`,
        },
      },
      compoundVariants: [
        { color: 'primary', variant: ['outline', 'subtle'], class: fieldFocus },
        { color: 'neutral', variant: ['outline', 'subtle'], class: fieldFocus },
        { fixed: false, size: 'md', class: 'md:text-[14px]' },
        { fixed: false, size: 'sm', class: 'md:text-[13px]' },
      ],
    },

    selectMenu: {
      slots: {
        base: 'rounded-md font-normal disabled:opacity-40',
        content: menu,
        item: 'rounded-md before:rounded-md',
      },
      variants: {
        size: {
          md: {
            base: 'px-3 py-2.5 text-[14px] md:text-[14px] font-sans',
          },
          sm: {
            base: 'px-3 py-2 text-[13px] font-sans bg-(--bg-surface)',
          },
        },
        variant: {
          outline: `${field} hover:bg-(--bg-surface)!`,
        },
      },
      compoundVariants: [
        { color: 'primary', variant: ['outline', 'subtle'], class: fieldFocus },
        { color: 'neutral', variant: ['outline', 'subtle'], class: fieldFocus },
        { fixed: false, size: 'md', class: 'md:text-[14px]' },
        { fixed: false, size: 'sm', class: 'md:text-[13px]' },
      ],
    },

    formField: {
      slots: {
        label: 'block font-sans font-normal text-[11px] tracking-[0.06em] uppercase text-(--fg-subtle) mb-1.5',
      },
      variants: {
        orientation: {
          vertical: {
            container: 'mt-0',
          },
        },
      },
    },

    table: {
      slots: {
        root: 'rounded-xl overflow-hidden',
        th: 'px-5 py-3 text-start font-sans font-normal text-[11px] tracking-[0.06em] uppercase text-(--fg-subtle) bg-(--bg-surface-alt) border-b border-(--border-subtle)',
        td: 'px-5 py-3 text-[14px] text-default whitespace-normal border-b border-(--border-subtle)',
        tbody: '[&>tr]:hover:bg-(--bg-surface-alt)',
      },
    },

    badge: {
      slots: {
        base: 'rounded-full font-sans font-normal uppercase tracking-[0.06em]',
      },
      variants: {
        size: {
          md: {
            base: 'text-[11px] px-2.5 py-0.5',
          },
        },
      },
      defaultVariants: {
        variant: 'outline',
        color: 'neutral',
      },
    },

    modal: {
      slots: {
        content: 'rounded-xl shadow-[var(--shadow-lg)] bg-(--bg-surface) ring ring-(--border-subtle)',
        header: 'p-0 mb-6 min-h-0',
        body: 'p-0',
        footer: 'p-0 pt-4',
        title: 'font-sans font-normal text-[22px] tracking-normal text-highlighted',
        close: 'size-8 rounded-md ring ring-(--border-subtle) text-(--fg-muted)',
      },
      variants: {
        overlay: {
          true: {
            overlay: 'bg-[color-mix(in_srgb,var(--neutral-950)_50%,transparent)]',
          },
        },
        fullscreen: {
          false: {
            content: 'w-[640px] max-w-[94vw] max-h-[92vh] p-8 rounded-xl shadow-[var(--shadow-lg)] overflow-y-auto',
          },
        },
      },
    },

    tabs: {
      slots: {
        root: 'gap-0',
        list: 'p-0 gap-0 rounded-none bg-transparent border-b border-(--border-subtle) flex w-full',
        trigger: 'rounded-none font-sans font-medium text-[13px] tracking-normal normal-case text-(--fg-muted) hover:data-[state=inactive]:text-(--fg-default)',
        indicator: 'rounded-none',
        content: 'rounded-none',
      },
      variants: {
        size: {
          md: {
            trigger: 'px-3 py-2.5 text-[13px]',
          },
        },
      },
      compoundVariants: [
        {
          color: 'primary',
          variant: 'link',
          class: {
            indicator: 'bg-(--hilo-blue-500) h-0.5',
            trigger: 'data-[state=active]:text-(--fg-default)',
          },
        },
      ],
      defaultVariants: {
        variant: 'link',
      },
    },

    card: {
      slots: {
        root: 'rounded-xl shadow-[var(--shadow-xs)]',
        header: 'px-6 py-5',
        title: 'font-sans font-normal text-[22px] tracking-normal text-(--fg-default)',
        body: 'p-6',
        footer: 'px-6 py-5',
      },
      variants: {
        variant: {
          outline: {
            root: 'bg-(--bg-surface) ring ring-(--border-subtle) divide-(--border-subtle)',
          },
        },
      },
    },

    slideover: {
      slots: {
        overlay: 'bg-[color-mix(in_srgb,var(--neutral-950)_50%,transparent)]',
        content: 'rounded-none shadow-[var(--shadow-lg)] bg-(--bg-surface) ring-0 border-(--border-subtle) sm:shadow-[var(--shadow-lg)]',
        header: 'px-8 pt-8 pb-4',
        body: 'px-8 pb-16',
        footer: 'px-8 py-4',
        title: 'font-sans font-normal text-[22px] tracking-normal text-highlighted',
        close: 'size-8 rounded-md ring ring-(--border-subtle) text-(--fg-muted)',
      },
      variants: {
        side: {
          right: {
            content: 'w-[600px] max-w-[96vw] rounded-l-xl',
          },
        },
        inset: {
          true: {
            content: 'rounded-xl',
          },
        },
      },
      compoundVariants: [
        {
          side: 'right',
          inset: false,
          class: {
            content: 'w-[600px] max-w-[96vw] rounded-l-xl',
          },
        },
      ],
    },

    checkbox: {
      slots: {
        base: 'rounded-sm',
        label: 'font-sans font-normal text-[14px] text-(--fg-default)',
      },
    },

    switch: {
      slots: {
        thumb: 'shadow-[var(--shadow-xs)]',
        label: 'font-sans font-normal text-[14px] text-(--fg-default)',
      },
    },

    dropdownMenu: {
      slots: {
        content: menu,
        item: 'rounded-md before:rounded-md',
        label: 'font-sans text-[11px] tracking-[0.06em] uppercase',
      },
    },

    tooltip: {
      slots: {
        content: 'rounded-md shadow-[var(--shadow-md)] bg-(--bg-surface) ring ring-(--border-subtle) font-sans text-[12px] tracking-normal normal-case h-auto text-(--fg-default)',
      },
    },

    toast: {
      slots: {
        root: 'rounded-lg shadow-[var(--shadow-md)] bg-(--bg-surface) ring ring-(--border-subtle)',
        title: 'font-sans text-[14px] font-medium tracking-normal',
      },
    },

    pagination: {
      slots: {
        list: 'flex items-center gap-2',
        label: 'font-sans text-[11px] tracking-[0.06em] uppercase min-w-8',
      },
    },
  },
})
