import ProductivityIntelligence from '../intelligence/ProductivityIntelligence'

export default function ProductivityWidgets({ focusAnalytics = {} }) {
  return <ProductivityIntelligence compact focusAnalytics={focusAnalytics} />
}
