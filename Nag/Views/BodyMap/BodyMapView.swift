import SwiftUI
import SwiftData

struct BodyMapView: View {
    @Query private var issues: [Issue]
    @Environment(\.modelContext) private var modelContext

    @State private var mapSide: BodyMapSide  = .front
    @State private var selectedIssue: Issue? = nil
    @State private var showAddIssue          = false
    @State private var showConfetti          = false  // TODO: wire up ConfettiView

    var body: some View {
        NavigationStack {
            ScrollView {
                VStack(spacing: 20) {
                    Picker("Side", selection: $mapSide) {
                        Text("Front").tag(BodyMapSide.front)
                        Text("Back").tag(BodyMapSide.back)
                    }
                    .pickerStyle(.segmented)
                    .padding(.horizontal)

                    BodyIllustrationView(
                        issues: issues,
                        side: mapSide,
                        onSelectIssue: { selectedIssue = $0 }
                    )
                    .frame(height: 420)
                    .padding(.horizontal)

                    ThemeAreaSectionView(
                        issues: issues,
                        onSelectIssue: { selectedIssue = $0 }
                    )
                }
                .padding(.vertical)
            }
            .navigationTitle("Nag")
            .navigationBarTitleDisplayMode(.large)
            .toolbar {
                ToolbarItem(placement: .topBarTrailing) {
                    Button { showAddIssue = true } label: {
                        Image(systemName: "plus")
                    }
                    .disabled(activeIssueCount >= 7)
                }
            }
        }
        .sheet(item: $selectedIssue) { issue in
            IssueDetailSheet(issue: issue) { showConfetti = true }
                .presentationDetents([.medium, .large])
        }
        .sheet(isPresented: $showAddIssue) {
            AddIssueView()
        }
    }

    private var activeIssueCount: Int {
        issues.filter { !$0.isResolved }.count
    }
}
