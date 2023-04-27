import { useHover, useFloating, useInteractions, FloatingPortal, FloatingArrow, arrow } from '@floating-ui/react'
import { ElementType, useId, useRef, useState } from 'react'
import { Placement, offset, shift } from '@floating-ui/dom'
import { motion, AnimatePresence } from 'framer-motion'

interface Props {
  children: React.ReactNode
  renderPropover: React.ReactNode
  className?: string
  as?: ElementType
  initialOpen?: Boolean
  placement?: Placement
}

function Propover({
  children,
  renderPropover,
  className,
  as: Element = 'div',
  initialOpen,
  placement = 'bottom-end'
}: Props) {
  const arrowRef = useRef(null)
  const [isOpen, setIsOpen] = useState(initialOpen || false)
  const { x, y, strategy, refs, context, middlewareData } = useFloating({
    middleware: [
      offset(6),
      shift(),
      arrow({
        element: arrowRef
      })
    ],
    placement
  })

  const showPopover = () => {
    setIsOpen(true)
  }

  const hidePopover = () => {
    setIsOpen(false)
  }

  const id = useId()
  return (
    <Element
      ref={refs.setReference}
      onMouseEnter={showPopover}
      onMouseLeave={hidePopover}
      className={className}
      id={id}
    >
      {children}
      <FloatingPortal>
        <AnimatePresence>
          {isOpen && (
            <motion.div
              ref={refs.setFloating}
              style={{
                position: strategy,
                top: y ?? 0,
                left: x ?? 0,
                transformOrigin: `${middlewareData.arrow?.x}px top`
              }}
              initial={{ opacity: 0, transform: 'scale(0)' }}
              animate={{ opacity: 1, transform: 'scale(1)' }}
              exit={{ opacity: 0, transform: 'scale(0)' }}
              transition={{ duration: 0.2 }}
            >
              <FloatingArrow
                fill='#fff'
                ref={arrowRef}
                context={context}
                style={{
                  left: middlewareData.arrow?.x,
                  top: middlewareData.arrow?.y
                }}
              />
              {renderPropover}
            </motion.div>
          )}
        </AnimatePresence>
      </FloatingPortal>
    </Element>
  )
}

export default Propover
