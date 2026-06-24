import { useState } from 'react';
import { ArrowUpRight } from '@phosphor-icons/react';

export interface EditorialHoverListItem {
  id: string;
  left: string;
  title: string;
  right: string;
  onClick?: () => void;
}

interface EditorialHoverListProps {
  label: string;
  footerNote?: string;
  items: EditorialHoverListItem[];
  leftColumnWidth?: string;
  variant?: 'default' | 'nameFirst';
}

export default function EditorialHoverList({
  label,
  footerNote,
  items,
  leftColumnWidth = 'w-[52px] sm:w-[64px]',
  variant = 'default',
}: EditorialHoverListProps) {
  const [hovered, setHovered] = useState<number | null>(null);
  const isNameFirst = variant === 'nameFirst';

  return (
    <>
      <div className="flex items-center gap-3 text-neutral-600 dark:text-neutral-400 mb-8 sm:mb-12">
        <span className="h-0.5 w-12 bg-brand" />
        <span className="text-[10px] sm:text-xs font-mono font-bold tracking-widest uppercase">
          {label}
        </span>
      </div>

      <ul
        onMouseLeave={() => setHovered(null)}
        className="border-t border-border"
      >
        {items.map((item, i) => (
          <li
            key={item.id}
            onMouseEnter={() => setHovered(i)}
            onClick={item.onClick}
            className={`group border-b border-border ${item.onClick ? 'cursor-pointer' : ''}`}
            style={{
              opacity: hovered !== null && hovered !== i ? 0.28 : 1,
              transition: 'opacity 0.35s ease',
            }}
          >
            <div className="flex items-center justify-between gap-6 py-5 sm:py-7">
              <div className="flex items-baseline gap-4 sm:gap-8 min-w-0 flex-1">
                {!isNameFirst && (
                  <span
                    className={`font-mono font-extrabold text-accent text-xs sm:text-sm tracking-wider tabular-nums shrink-0 ${leftColumnWidth}`}
                  >
                    {item.left}
                  </span>
                )}
                <h3 className="font-sans font-black uppercase tracking-tight text-fg text-2xl sm:text-4xl lg:text-5xl leading-none truncate transition-transform duration-300 group-hover:translate-x-2 sm:group-hover:translate-x-5">
                  {item.title}
                </h3>
              </div>
              <div className="flex items-center gap-4 sm:gap-6 shrink-0">
                <span
                  className={`font-mono uppercase tracking-wider text-neutral-500 dark:text-neutral-400 text-right ${
                    isNameFirst
                      ? 'text-[10px] sm:text-xs sm:max-w-none max-w-[120px]'
                      : 'hidden sm:block text-[10px] sm:text-xs max-w-[180px]'
                  }`}
                >
                  {item.right}
                </span>
                {item.onClick && (
                  <ArrowUpRight className="h-5 w-5 sm:h-6 sm:w-6 text-neutral-400 group-hover:text-accent dark:group-hover:text-sky-300 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all shrink-0" />
                )}
              </div>
            </div>
          </li>
        ))}
      </ul>

      {footerNote && (
        <p className="mt-8 font-mono text-[10px] uppercase tracking-[0.2em] text-neutral-400 dark:text-neutral-500">
          {footerNote}
        </p>
      )}
    </>
  );
}
